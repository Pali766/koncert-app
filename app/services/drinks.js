// app/services/drinks.js
import supabase from './supabase';

export async function fetchDrinks() {
  const { data, error } = await supabase.from('drinks').select('*').order('name', { ascending: true });
  if (error) throw error;
  return data;
}

export async function addDrink(name) {
  const { error } = await supabase.from('drinks').insert([{ name, active: true }]);
  if (error) throw error;
}
