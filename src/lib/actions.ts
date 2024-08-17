'use server';

export async function getData() {
  console.log('Fetching data...')
  return Promise.resolve({data: 'test'})
}