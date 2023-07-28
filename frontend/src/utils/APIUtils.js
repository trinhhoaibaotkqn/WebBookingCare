export const isFetchDataSuccess = (res) => {
    return res.data && res.data.errCode === 0 && res.data.data
}