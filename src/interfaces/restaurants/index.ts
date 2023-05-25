import { MenuItemsInterface } from 'interfaces/menu-items';
import { OrdersInterface } from 'interfaces/orders';
import { ReservationsInterface } from 'interfaces/reservations';
import { StaffInterface } from 'interfaces/staff';

export interface RestaurantsInterface {
  id?: string;
  owner_id?: string;
  name: string;
  location: string;
  contact_details: string;
  operating_hours: string;
  created_at?: Date;
  updated_at?: Date;
  menu_items?: MenuItemsInterface[];
  orders?: OrdersInterface[];
  reservations?: ReservationsInterface[];
  staff?: StaffInterface[];
}
