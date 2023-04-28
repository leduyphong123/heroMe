import {cv} from "../index.js";


function MapCreate(positer, status, img) {
    this.positer = positer;
    this.status = status;
    this.img = img;
    this.draw = function () {

        cv.drawImage(this.img, this.positer.x, this.positer.y, this.status.width, this.status.height);

    }
}

export default MapCreate;