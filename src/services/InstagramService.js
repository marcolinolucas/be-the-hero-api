const axios = require('axios');

const instaApi = axios.create({
	baseURL: 'https://api.instagram.com',
});

// async function test() {
// 	const res = await instaApi
// 		.post('oauth/authorize', {
// 			params: {
// 				client_id: '247189513403143',
// 				redirect_uri: 'http://localhost:3333/auth/',
// 				scope: 'user_profile,user_media',
// 				response_type: 'code',
// 			},
// 		});
// 	console.log(res);
// 	return res.data;
// }

async function getAccessToken({ code }) {
	const response = await instaApi
		.post('oauth/access_token', {
			params: {
				client_id: '247189513403143',
				client_secret: '0c5552c1b13eac087402321f8cbef756',
				code,
				grant_type: 'authorization_code',
				redirect_uri: '',
			},
		})
		.then(res => console.log(res))
		.catch(err => err.response.data);

	return response;
}

module.exports = {
	// test,
	getAccessToken,
};
