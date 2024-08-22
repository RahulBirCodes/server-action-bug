'use server';

import {redirect} from "next/navigation";

export const signIn = async (
  formData: FormData,
) => {
  redirect('./verify-request')
}