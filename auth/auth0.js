const { ManagementClient } = require('auth0');

const auth0 = new ManagementClient({
  domain: 'dev-73zm2hl71rhp28c2.us.auth0.com',
  clientId: 'wBI4BXJFwUHd0a3XAnTkb0BMd0xRasw0', // Updated property name
  clientSecret: 'Bu6MvJtnkC6SfEW0U7xZEpf_rTD9gvCWi43AF0JR6yDk2HvxpWyBJd9ufuGpx0HS',
  audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
});

module.exports = auth0;
