// @ts-nocheck
import { Controller, Post, Req, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';

import axios from 'axios';
import { CheckoutDto, WebhookDto } from './dto/app.dto';


const auth = `${process.env.API_Key}:${process.env.API_Secret}`;
const base64Auth = btoa(auth);

const checkoutObj = {
  invoice_currency: 'USD',
  amount: 100000,
  customer_details: {
    name: 'Andrea Lark',
    country: 'SG',
    email: 'andrea@example.com',
    phone: {calling_code: '65', number: '87654321'}
  },
  billing_details: {
    address: {
      city: 'Singapore',
      country: 'SG',
      line1: '1st Street',
      line2: '2nd Avenue',
      postal_code: '43004',
      state: 'Singapore'
    },
    label: 'Home',
    name: 'Andrea Lark',
    phone: {calling_code: '65', number: '87654321'}
  },
  shipping_details: {
    address: {
      city: 'Singapore',
      country: 'SG',
      line1: '1st Street',
      line2: '2nd Avenue',
      postal_code: '43004',
      state: 'Singapore'
    },
    label: 'Home',
    name: 'Andrea Lark',
    phone: {calling_code: '65', number: '87654321'}
  },
  // success_url: 'https://mystore.com/success_page',
  // cancel_url: 'https://mystore.com/try_again',
  webhook_url: process.env.WEBHOOK,
  payment_methods: ['paynow_sgd', 'card'],
  transaction_description: '1 x T-shirt',
  expires_at: '2024-07-21T14:01:04.576356Z',
  reference_id: 'mystore_order_00001'
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('checkout')
  async checkout(@Req() req: Request): Promise<number> {
    return fetch('https://service-sandbox.tazapay.com/v3/checkout', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic YWtfdGVzdF81R0NTVjdCUkgyWEdDWFROVVhDSDpza190ZXN0X0I2bFZEMWY0MERod09zUk9KVFVEdTRHZkNZbHZQU2NWeld2Tmg2YzJlWFg3a3pyZzI4cmlNOUJsUjJqMFRpVGdvdWNnNGR3cE5aRXVuUmY0bThCc3NlUXJnRHFYQjFFQ0FZalVDYVJuNkNQZ2Z1Qnd6eFJtcnM4bXpUQjhhMEZO`,
      },
      body: JSON.stringify(checkoutObj)
    })
    .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  }
  @Post('webhook')
  async webhook(@Req() req: Request, @Body() webhookBody: WebhookDto): Promise<number> {
    console.log('webhook', webhookBody)
  }
}
