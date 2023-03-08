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
}
export default CommonUtils;