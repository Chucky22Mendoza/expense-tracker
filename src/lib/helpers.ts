/**
 * Verififca que sea una cotraseña válida
 * @param {string} password - Contraseña
 * @returns {boolean} True/False si es válida o no
 */
export const validatePassword = (password: string): boolean => {
  return (
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password) &&
    password.length >= 8 &&
    password.length <= 50
  );
};

/**
 * Verififca que sea un correo válido
 * @param {string} email - Email
 * @returns {boolean} True/False si es válido o no
 */
export const validateEmail = (email: string): boolean => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email || regex.test(email) === false || email.length > 80) {
    return false;
  }
  return true;
};

/**
 * Validates a password based on specific criteria.
 *
 * The password must contain at least one uppercase letter, one lowercase letter,
 * one digit, and one special character. Additionally, it must be between 8 and 50
 * characters in length.
 *
 * @param password - The password string to validate.
 * @returns A boolean indicating whether the password meets the criteria.
 */
export const validateNumber = (value: string): boolean => !/^\d+$/.test(value);

/**
 * Validates a phone number to ensure it contains 10 or 11 digits.
 *
 * @param phone - The phone number string to validate.
 * @returns A boolean indicating whether the phone number is valid.
 */
export const validatePhone = (phone: string): boolean => /^\d{10,11}$/.test(phone) && phone !== '';

/**
 * Removes accents from a given text string.
 *
 * @param text - The text string from which accents will be removed.
 * @returns A new string with accents removed.
 */
export const removeAccents =(text: string): string => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/**
 * Restores indexes to each element in the input array.
 *
 * @param data - The array of elements to restore indexes for.
 * @returns A new array with each element having an additional 'index' property representing its index in the input array.
 */
export const restoreIndexes = (data: any[]): any[] => (
  data.map((value, index) => ({
    ...value,
    index: index,
  }))
);

/**
 * Builds a query string from an object.
 *
 * @param params - The object containing key-value pairs to be included in the query string.
 * @returns A string representing the query string.
 * @example
 *
 * Create a query string
 * const params = {
 *   search: 'example',
 *   page: 2,
 *   sort: 'asc',
 * };
 * Output: "?search=example&page=2&sort=asc"
 */
export const buildQueryParams = <T extends object>(params: T): string => {
  // Check if the params object is empty
  if (Object.keys(params).length === 0) {
    return '';
  }
  // Build the query string with key-value pairs separated by '&' and '='
  // Example: key1=value1&key2=value2&...
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key as keyof object])}`)
    .join('&');
};


/**
 * Represents a wrapper interface for catalogs.
 * @property {number} page - The page number for pagination.
 * @property {number} [size] - The size of each page, optional.
 * @property {string} [searchField] - The field to search within the parameters.
 * @property {string} [sortBy] - The field to sort by.
 * @property {'ASC' | 'DESC'} [direction] - The sorting direction, either 'ASC' for ascending or 'DESC' for descending.
 */
export interface ParametersWrapper {
  page: number;
  size?: number;
  searchField?: string;
  sortBy?: string;
  direction?: 'ASC' | 'DESC';
}

/**
 * Handles the keydown event for input fields to restrict input to numeric values only.
 *
 * @param e - The keyboard event triggered by the user.
 *
 * The function stops event propagation and allows certain control keys such as
 * 'Backspace', 'Arrow' keys, 'Delete', 'Enter', and others. It prevents the default
 * action if the pressed key is not a digit or an allowed control key.
 */
export const onKeyDownNumberHandler = (e: React.KeyboardEvent) => {
  e.stopPropagation();
  if (e.ctrlKey && (e.key === 'v' || e.key === 'V')) {
    return;
  }

  const allowedKeys = [
    'Backspace', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Delete',
    'Enter', 'Home', 'End', 'Tab', 'CapsLock', 'Shift', 'Meta', 'Control'
  ];

  if (allowedKeys.includes(e.key)) {
    return;
  }

  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
  }
};

/**
 * Copies the specified text to the clipboard and displays an alert.
 *
 * @param text - The text to be copied to the clipboard.
 */
export const copyToClipboard = (text: string) => {
  let aux = document.createElement("input");
  aux.setAttribute("value", text);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  alert("Copiado en tu clipboard");
};

export const generateRandomColor = () => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + color.padStart(6, '0');
};
