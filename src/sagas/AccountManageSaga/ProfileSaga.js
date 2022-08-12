import ProfileStore from '../../reducers/AccManageReducer/ProfileReducer'
import { profileApi } from '../../api'
// import { profile } from '../mockup'
const token = localStorage.getItem('token')

async function getProfile(payload) {
    const actions = ProfileStore()
    await actions.getProfileRequest()
    try {
        let idProfile = payload;
        if (!idProfile) { idProfile = 0 }
        // const res = profile
        const res = await profileApi.getProfile(
            null, { id: `${idProfile}` }, null, token
        )
        let profile = res.data;
        if (!profile) { profile = [] }
        await actions.getProfileSuccess({
            data: profile
        })
    } catch (error) {
        await actions.getProfileFailure(error)
    }
}

async function updateProfile(payload) {
    const actions = ProfileStore()
    await actions.updateProfileRequest()
    try {
        const res = await profileApi.updateProfile(
            {
                fullName: payload.name,
                birthday: payload.birthday,
                gender: payload.gender,
                phone: payload.phone,
                address: payload.address,
            }, { id: `${payload.id}` }, null, token
        )
        if (res.status) {
            await actions.updateProfileSuccess()
            await getProfile(payload.id)
        } else throw { message: res.message }
    } catch (error) {
        await actions.updateProfileFailure(error)
    }
}

export {
    getProfile, updateProfile
}