import React from "react";
import methodModel from "../../../methods/methods";
import { FiPlus } from "react-icons/fi";
import { MdEdit } from "react-icons/md";

const Html = ({
  inputElement,
  uploadImage,
  img,
  remove,
  loader,
  model,
  multiple,
  required,
  accept,
  err,
  type,
  label = "",
}) => {
  return (
    <>
      <label
        className={` ${img && !multiple ? "d-none" : ""
          }`}
      >
        <input
          type="file"
          className="hidden"
          ref={inputElement}
          accept={accept}
          multiple={multiple ? true : false}
          disabled={loader}
          onChange={(e) => {
            uploadImage(e);
          }}
        />
        <div className="">
          <span className="lable_upload">  <MdEdit className="" />{label || ""}</span>
        </div>
      </label>

      {loader ? (
        <div className="text-success text-center mt-2">
          Uploading... <i className="fa fa-spinner fa-spin"></i>
        </div>
      ) : (
        <></>
      )}

      {type == 'img' ? <>
        {multiple ? (
          <>
            <div className="imagesRow flex gap-3">
              {img &&
                img.map((itm, i) => {
                  return (
                    <div className="imagethumbWrapper">
                      <img
                        src={methodModel.noImg(itm,model)}
                        className="bg-[#f8fbff] border border-[#0000000a] p-2 w-[100px] h-[100px] object-contain"
                      />
                      <i
                        className="fa fa-times"
                        title="Remove"
                        onClick={(e) => remove(i)}
                      ></i>
                    </div>
                  );
                })}
            </div>
          </>
        ) : (
          <>
            {img ? (
              <div className="imagethumbWrapper">
                <img src={methodModel.noImg(img,model)} className="thumbnail rounded-full  w-[100px] h-[100px] object-cover " />
                <i
                  className="fa fa-times"
                  title="Remove"
                  onClick={(e) => remove()}
                ></i>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </> : <>
        {img ? <>
          {multiple ? <>
            <div className="flex gap-3">
              {img.map((itm, i) => {
                return <div className="imagethumbWrapper">
                  <a className="" target="_new" href={methodModel.noImg(itm, model)}>
                    <span class="material-symbols-outlined text-[50px]">draft</span>
                  </a>
                  <i
                    className="fa fa-times"
                    title="Remove"
                    onClick={(e) => remove(i)}
                  ></i>
                </div>
              })}
            </div>
          </> : <>
            <div className="imagethumbWrapper">
              <a className="" target="_new" href={methodModel.noImg(img, model)}>
                <span class="material-symbols-outlined text-[50px]">draft</span>
              </a>
              <i
                className="fa fa-times"
                title="Remove"
                onClick={(e) => remove()}
              ></i>
            </div>

          </>}

        </> : <></>}

      </>}



      {required && !img ? (
        <div className="text-danger">{err ? err : "Image is Required"}</div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Html;
