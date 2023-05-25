import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createUsers } from 'apiSdk/users';
import { Error } from 'components/error';
import { UsersInterface } from 'interfaces/users';
import { usersValidationSchema } from 'validationSchema/users';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { getRestaurants } from 'apiSdk/restaurants';
import { RestaurantsInterface } from 'interfaces/restaurants';

function UsersCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: UsersInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createUsers(values);
      resetForm();
      router.push('/users');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<UsersInterface>({
    initialValues: {
      role: '',
      orders: [],
      reservations: [],
      restaurants: [],
      staff: [],
    },
    validationSchema: usersValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Users
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="role" mb="4" isInvalid={!!formik.errors.role}>
            <FormLabel>Role</FormLabel>
            <Input type="text" name="role" value={formik.values.role} onChange={formik.handleChange} />
            {formik.errors.role && <FormErrorMessage>{formik.errors.role}</FormErrorMessage>}
          </FormControl>

          <ArrayFormField
            values={formik.values.orders}
            errors={formik.errors.orders}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'status', label: 'status' },
              { fieldName: 'special_requests', label: 'special_requests' },
              { fieldName: 'order_type', label: 'order_type' },
              { fieldName: 'created_at', label: 'created_at' },
              { fieldName: 'updated_at', label: 'updated_at' },
              { fieldName: 'restaurant_id', label: 'restaurants' },
            ]}
            title={'Orders'}
            name="orders"
            rowInitialValues={{
              status: '',
              special_requests: '',
              order_type: '',
              created_at: new Date(new Date().toDateString()),
              updated_at: new Date(new Date().toDateString()),
              restaurant_id: null,
            }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'status' && (
                  <FormControl id="status" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'special_requests' && (
                  <FormControl id="special_requests" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'order_type' && (
                  <FormControl id="order_type" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'created_at' && (
                  <FormControl id="created_at" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'updated_at' && (
                  <FormControl id="updated_at" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'restaurant_id' && (
                  <AsyncSelect<RestaurantsInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select Restaurants'}
                    fetcher={getRestaurants}
                    renderOption={(record) => (
                      <option key={record.id} value={record.id}>
                        {record.id}
                      </option>
                    )}
                  />
                )}
              </>
            )}
          />

          <ArrayFormField
            values={formik.values.reservations}
            errors={formik.errors.reservations}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'date', label: 'date' },
              { fieldName: 'time', label: 'time' },
              { fieldName: 'number_of_guests', label: 'number_of_guests' },
              { fieldName: 'table_status', label: 'table_status' },
              { fieldName: 'created_at', label: 'created_at' },
              { fieldName: 'updated_at', label: 'updated_at' },
              { fieldName: 'restaurant_id', label: 'restaurants' },
            ]}
            title={'Reservations'}
            name="reservations"
            rowInitialValues={{
              date: new Date(new Date().toDateString()),
              time: new Date(new Date().toDateString()),
              number_of_guests: 0,
              table_status: '',
              created_at: new Date(new Date().toDateString()),
              updated_at: new Date(new Date().toDateString()),
              restaurant_id: null,
            }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'date' && (
                  <FormControl id="date" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'time' && (
                  <FormControl id="time" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'number_of_guests' && (
                  <FormControl id="number_of_guests" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <NumberInput
                      name={name}
                      value={value}
                      onChange={(valueString, valueNumber) =>
                        formik.setFieldValue(name, Number.isNaN(valueNumber) ? 0 : valueNumber)
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'table_status' && (
                  <FormControl id="table_status" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'created_at' && (
                  <FormControl id="created_at" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'updated_at' && (
                  <FormControl id="updated_at" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'restaurant_id' && (
                  <AsyncSelect<RestaurantsInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select Restaurants'}
                    fetcher={getRestaurants}
                    renderOption={(record) => (
                      <option key={record.id} value={record.id}>
                        {record.id}
                      </option>
                    )}
                  />
                )}
              </>
            )}
          />

          <ArrayFormField
            values={formik.values.restaurants}
            errors={formik.errors.restaurants}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'name', label: 'name' },
              { fieldName: 'location', label: 'location' },
              { fieldName: 'contact_details', label: 'contact_details' },
              { fieldName: 'operating_hours', label: 'operating_hours' },
              { fieldName: 'created_at', label: 'created_at' },
              { fieldName: 'updated_at', label: 'updated_at' },
            ]}
            title={'Restaurants'}
            name="restaurants"
            rowInitialValues={{
              name: '',
              location: '',
              contact_details: '',
              operating_hours: '',
              created_at: new Date(new Date().toDateString()),
              updated_at: new Date(new Date().toDateString()),
            }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'name' && (
                  <FormControl id="name" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'location' && (
                  <FormControl id="location" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'contact_details' && (
                  <FormControl id="contact_details" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'operating_hours' && (
                  <FormControl id="operating_hours" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'created_at' && (
                  <FormControl id="created_at" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'updated_at' && (
                  <FormControl id="updated_at" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
              </>
            )}
          />

          <ArrayFormField
            values={formik.values.staff}
            errors={formik.errors.staff}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'role', label: 'role' },
              { fieldName: 'created_at', label: 'created_at' },
              { fieldName: 'updated_at', label: 'updated_at' },
              { fieldName: 'restaurant_id', label: 'restaurants' },
            ]}
            title={'Staff'}
            name="staff"
            rowInitialValues={{
              role: '',
              created_at: new Date(new Date().toDateString()),
              updated_at: new Date(new Date().toDateString()),
              restaurant_id: null,
            }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'role' && (
                  <FormControl id="role" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'created_at' && (
                  <FormControl id="created_at" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'updated_at' && (
                  <FormControl id="updated_at" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'restaurant_id' && (
                  <AsyncSelect<RestaurantsInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select Restaurants'}
                    fetcher={getRestaurants}
                    renderOption={(record) => (
                      <option key={record.id} value={record.id}>
                        {record.id}
                      </option>
                    )}
                  />
                )}
              </>
            )}
          />

          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default UsersCreatePage;
