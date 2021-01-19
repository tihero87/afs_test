import React from 'react';
import IconClose from "../icons/IconClose";
import Button from "../Button";

function AttachPhoto({orgApi, delPhoto, addPhotoInput, addPhoto}) {
    return(
        <div className="org_contacts">
            <h2>приложенные фото</h2>

            <div className="org_row">
                <div className="twin_col">
                    <div className="img_gallery">
                        {
                            orgApi.photos.map((photo) => {
                                return (
                                    <div key={photo.name} className="img_container">
                                        <img src = {photo.thumbpath} alt={`${photo.name}`} />
                                        <p className="img_name">{photo.name}</p>
                                        <p className="img_date">{}</p>
                                        <IconClose handleClick={() => delPhoto(photo.name)}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    { addPhotoInput && <input id="photoinput" className="inp" type='file'/> }
                </div>

                <Button className="btn" name="Добавить изображение" btnClick={addPhoto} icon />

            </div>
        </div>
    )
}

export default AttachPhoto;