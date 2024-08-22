'use server';

import {redirect} from "next/navigation";

export async function getData() {
  console.log('Fetching data...')
  redirect('http://demo.localhost:3000/feed')
  // return Promise.resolve({data: 'test'})
  // redirect('./feed')
}