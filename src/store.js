const SCHEDULE_KEY = 'friday_schedule'
const IMAGES_KEY = 'gallery_images'
const AUTH_KEY = 'mod_authed'

const ROLES = ['Security', 'Ice Cream', 'Mascot', 'Treasurer', 'Overseer']

const defaultSchedule = Object.fromEntries(ROLES.map(r => [r, '']))

export const getSchedule = () =>
  JSON.parse(localStorage.getItem(SCHEDULE_KEY)) ?? defaultSchedule

export const saveSchedule = (data) =>
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(data))

export const getImages = () =>
  JSON.parse(localStorage.getItem(IMAGES_KEY)) ?? []

export const saveImages = (imgs) =>
  localStorage.setItem(IMAGES_KEY, JSON.stringify(imgs))

export const isAuthed = () => sessionStorage.getItem(AUTH_KEY) === 'true'
export const setAuthed = () => sessionStorage.setItem(AUTH_KEY, 'true')
export const clearAuthed = () => sessionStorage.removeItem(AUTH_KEY)

const OFFICERS_KEY = 'officers'
const defaultOfficers = [
  { id: 1, name: 'Niti Pagare', role: 'President', desc: 'Oversees roles, helps with tables, and makes sure the ice cream actually shows up.', pic: '' },
  { id: 2, name: 'Eirene Hong', role: 'Vice President', desc: 'Manages volunteer placement and table setup so everything runs smoothly.', pic: '' },
  { id: 3, name: 'Kate Li', role: 'Treasurer', desc: 'Tracks all money made and manages donations to United for Malaria.', pic: '' },
  { id: 4, name: 'Woobin Choi', role: 'Historian', desc: 'Records the sales through photos and videos — the official A4A content creator.', pic: '' },
]
export const getOfficers = () => JSON.parse(localStorage.getItem(OFFICERS_KEY)) ?? defaultOfficers
export const saveOfficers = (data) => localStorage.setItem(OFFICERS_KEY, JSON.stringify(data))

const ORDERS_KEY = 'preorders'
export const getOrders = () => JSON.parse(localStorage.getItem(ORDERS_KEY)) ?? []
export const saveOrders = (orders) => localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
export const clearOrders = () => localStorage.removeItem(ORDERS_KEY)

export const PASSCODE = 'admin1234'
export { ROLES }
