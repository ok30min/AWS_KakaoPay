// handler.js

'use strict';

const axios = require('axios'); // using 'axios' node module for HTTP request

module.exports.payment = async ({ multiValueQueryStringParameters: params }) => {
  // get parmas
  const {
    item_name,
    quantity,
    total_amount
  } = params;

  
  // const vat_amount = 0;
  const tax_free_amount = 0;
  const approval_url = 'https://kapi.kakao.com/v1/payment/approve';
  const fail_url = 'http://example.com/fail';
  const cancel_url = 'http://example.com/cancel';

  // set data
  const data = [
    'cid=TC0ONETIME',
    'partner_order_id=partner_order_id',
    'partner_user_id=partner_user_id',
    `item_name=${item_name}`,
    `quantity=${quantity}`,
    `total_amount=${total_amount}`,
    // `vat_amount=${vat_amount}`,
    `tax_free_amount=${tax_free_amount}`,
    `approval_url=${approval_url}`,
    `fail_url=${fail_url}`,
    `cancel_url=${cancel_url}`
  ].join('&'); // encode data (application/x-www-form-urlencoded)

  // send request (kakao payment)
  const req = await axios.post('https://kapi.kakao.com/v1/payment/ready', data, {
    headers: {
      'Authorization': 'KakaoAK 9fb65a39436418537a3a4ad35dee3c1a', // 'xxx...' = admin key
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const pc_url = req.data.next_redirect_pc_url; // get pc url

  const response = {
    statusCode: 301, // redirect
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      Location: pc_url
    },
    body: ''
  };

  return response;
};
