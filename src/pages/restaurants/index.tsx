import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getRestaurants } from 'apiSdk/restaurants';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { Error } from 'components/error';

function RestaurantsListPage() {
  const { data, error, isLoading } = useSWR<RestaurantsInterface[]>(() => true, getRestaurants);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Restaurants
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Owner Id</Th>
                  <Th>Name</Th>
                  <Th>Location</Th>
                  <Th>Contact Details</Th>
                  <Th>Operating Hours</Th>
                  <Th>Created At</Th>
                  <Th>Updated At</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.owner_id}</Td>
                    <Td>{record.name}</Td>
                    <Td>{record.location}</Td>
                    <Td>{record.contact_details}</Td>
                    <Td>{record.operating_hours}</Td>
                    <Td>{record.created_at as unknown as string}</Td>
                    <Td>{record.updated_at as unknown as string}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default RestaurantsListPage;