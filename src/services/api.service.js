import ApiCoreService from "./ApiCore.service.js"

export default {
    checkLogin: async (form) => (await ApiCoreService.post("admin/validate-login", form)),
    getAllOrders: async () => (await ApiCoreService.get("admin/orders")),
    getAllDoors: async () => (await ApiCoreService.get("door/all")),
    createNewDoor: async(form) => (await ApiCoreService.post("admin/new-door", form)),
    deleteDoor: async (doorId) => (await ApiCoreService.delete(`admin/door/${doorId}/false`)),
    forceDeleteDoor: async (doorId) => (await ApiCoreService.delete(`admin/door/${doorId}/true`)),
    getDoor: async (doorId) => (await ApiCoreService.get(`door/${doorId}`))
};