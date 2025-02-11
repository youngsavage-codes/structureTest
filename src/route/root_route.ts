import express from 'express';
import authRoute from './auth_route';
import productRoute from './products_route';
import userRoute from './user_route';
import cartRoute from './cart_route';
import orderRoute from './order_route';
import transactionRoute from './transaction_route';
import paymentRoute from './payment_route';


const rootRoute = express();

rootRoute.use('/auth', authRoute);
rootRoute.use('/product', productRoute);
rootRoute.use('/user', userRoute);
rootRoute.use('/cart', cartRoute);
rootRoute.use('/order', orderRoute);
rootRoute.use('/transaction', transactionRoute);
rootRoute.use('/payment', paymentRoute)

export default rootRoute;
