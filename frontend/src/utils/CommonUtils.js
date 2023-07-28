import { Buffer } from "buffer";

class CommonUtils {
    static getBase64(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    static getPreviewImgfromDatabase(image) {
        if (image && image.data) {
            let imageBase64 = new Buffer(image, 'base64').toString('binary');
            return imageBase64
        } else {
            return null;
        }
    }

    static getRoleByKey(listRole, key) {
        return listRole.find((item) => {
            return item.key === key;
        })
    }

    // static getListSelectUserName(listData) {
    //     let listSelect = [];
    //     listData.forEach((item) => {
    //         let obj = {
    //             value: item.email,
    //             label: item.name,
    //         }
    //         listSelect.push(obj);
    //     })
    //     return listSelect;
    // }

    // static getDataByEmail(email, listData) {
    //     return listData.find((item) => {
    //         return item.email === email;
    //     })
    // }

    // static sortListDataByEmail(email, listData) {
    //     let newList = [{ a: "a" }];
    //     listData.forEach((item) => {
    //         if (item.email === email) {
    //             newList[0] = item;
    //         } else {
    //             newList.push(item)
    //         }
    //     })
    //     return newList;
    // }

    static capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1);
    }

    static customizeDataSelectFromNameID(list) {
        let arr = [];
        list.forEach((item) => {
            let obj = {
                value: item.id,
                label: item.name,
            }
            arr.push(obj);
        })
        return arr;
    }

    static findNameByID(list, id) {
        return list.find((item) => {
            return item.id === id
        })
    }
}
export default CommonUtils;