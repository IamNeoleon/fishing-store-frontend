export const getUser = () => {
    const dataFromLs = localStorage.getItem('user');
    if (dataFromLs) {
        const user = JSON.parse(dataFromLs);

        return user;
    }
}