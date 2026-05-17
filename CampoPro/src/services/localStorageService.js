import AsyncStorage from '@react-native-async-storage/async-storage';

const ACTIVE_ROLE_KEY = '@CampoPro:activeRole';

export async function saveActiveRole(role) {
  await AsyncStorage.setItem(ACTIVE_ROLE_KEY, role);
}

export async function getSavedActiveRole() {
  return AsyncStorage.getItem(ACTIVE_ROLE_KEY);
}

export async function clearSavedActiveRole() {
  await AsyncStorage.removeItem(ACTIVE_ROLE_KEY);
}