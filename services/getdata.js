export const data = (page) => {
    const URL = `https://challenges.tate.cloud/front2018/users?page=${page}`;
    return fetch(URL)
        .then((res) =>
            res.json()
        )
        .catch((code) => {
            console.log(JSON.stringify(code));
        });
};