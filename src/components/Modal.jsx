import React from "react";
import MyButton from "./MyButton";
import MyDetail from "./MyDetail";
import MyInput from "./MyInput";
import MySelect from "./MySelect";

const Modal = (props) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center">
      <div className="relative w-full max-w-[40%] max-h-full">
        <div className="relative bg-white rounded-lg border border-1 border-gray-500 shadow">
          {/* Толгой хэсэг */}
          <div class="flex items-start justify-between py-3 px-6 rounded-t border-b border-b-1 border-b-gray-300">
            <h3 className="mt-2 font-semibold text-blue-700">
              {/* Нууц үг өөрчлөх, эсвэл холболт хийх эсэхийг шалгах */}
              {props.action.operation === "password" ? (
                "Нууц үг өөрчлөх"
              ) : props.action.operation === "link" ? (
                "Холболт хийх"
              ) : (
                // Нууц үг өөрчлөхгүй бол
                <>
                  {props.title}
                  {props.action.operation === "detail"
                    ? " дэлгэрэнгүй"
                    : props.action.operation === "edit"
                    ? " засах"
                    : props.action.operation === "add"
                    ? " нэмэх"
                    : null}
                </>
              )}
            </h3>
          </div>
          {/* Их бие */}
          <div className="my-3 py-3 px-6 space-y-6">
            {/* Нууц үг өөрчлөх, холболт хийх эсэхийг шалгах */}
            {props.action.operation === "link" ? (
              // Холболт хийх бол
              <>
                {props.title === "Гэрээ" ? (
                  <MyInput
                    type="text"
                    name="name"
                    label="Гэрээний нэр"
                    readonly={true}
                    value={props.editData?.name}
                  />
                ) : props.title === "Хэрэглэгч" ? (
                  <MyInput
                    type="email"
                    name="email"
                    label="Имэйл хаяг"
                    readonly={true}
                    value={props.editData?.email}
                  />
                ) : null}
                <MySelect
                  label="Байгууллага"
                  name="enterprise"
                  options={props.enterprises}
                  handleChangeValue={props.handleChangeValue}
                  value={
                    props.editData === undefined
                      ? null
                      : props.editData?.enterprise
                  }
                />
                <MySelect
                  label="Систем"
                  name="system"
                  options={props.systems}
                  handleChangeValue={props.handleChangeValue}
                  value={
                    props.editData === undefined ? null : props.editData?.system
                  }
                />
              </>
            ) : props.action.operation === "password" ? (
              // Нууц үг өөрчлөх бол
              <>
                <MyInput
                  type="email"
                  name="email"
                  label="Имэйл хаяг"
                  readonly={true}
                  value={props.editData?.email}
                />
                <MyInput
                  type="password"
                  name="newpassword"
                  label="Шинэ нууц үг"
                  handleChangeValue={props.handleChangeValue}
                  value={
                    props.editData === undefined
                      ? null
                      : props.editData?.newpassword
                  }
                />
                <MyInput
                  type="password"
                  name="confirmpassword"
                  label="Батлах нууц үг"
                  handleChangeValue={props.handleChangeValue}
                  value={
                    props.editData === undefined
                      ? null
                      : props.editData?.confirmpassword
                  }
                />
              </>
            ) : (
              // Нууц үг өөрчлөхгүй бол
              props.metadatas?.map((metadata, index) => {
                // Сонголт нь тогтмол утгаас хадгалах, үгүй бол өгөгдлийн сангаас татсан утгыг сонголтод хадгалах
                let options = metadata.select;
                if (
                  (metadata?.name === "permission" ||
                    metadata?.name === "parent" ||
                    metadata?.name === "type" ||
                    metadata?.name === "mainmenu" ||
                    metadata?.name === "submenu") &&
                  metadata?.select?.length === 1
                ) {
                  options = [...options, ...props.options];
                }

                return props.action.operation === "detail" ? (
                  <MyDetail
                    metadata={metadata}
                    value={props.action.data[metadata.name]}
                    key={index}
                    permissions={props.options}
                  />
                ) : props.action.operation === "add" ? (
                  metadata.select === undefined ? (
                    <MyInput
                      key={index}
                      type={metadata.type}
                      name={metadata.name}
                      label={metadata.desc}
                      handleChangeValue={props.handleChangeValue}
                      value={
                        props.newData === undefined
                          ? null
                          : props.newData[metadata.name]
                      }
                    />
                  ) : (
                    <MySelect
                      key={index}
                      name={metadata.name}
                      label={metadata.desc}
                      options={options}
                      handleChangeValue={props.handleChangeValue}
                      newData={props.newData}
                      value={
                        props.newData === undefined
                          ? null
                          : props.newData[metadata.name]
                      }
                    />
                  )
                ) : props.action.operation === "edit" ? (
                  metadata.select === undefined ? (
                    <MyInput
                      key={index}
                      type={metadata.type}
                      name={metadata.name}
                      label={metadata.desc}
                      handleChangeValue={props.handleChangeValue}
                      value={props.editData[metadata.name]}
                    />
                  ) : (
                    <MySelect
                      key={index}
                      name={metadata.name}
                      label={metadata.desc}
                      options={options}
                      editData={props.editData}
                      handleChangeValue={props.handleChangeValue}
                      value={props.editData[metadata.name]}
                    />
                  )
                ) : null;
              })
            )}
          </div>
          {/* Хөл хэсэг */}
          <div class="flex items-center my-1 py-3 px-6 space-x-2 rounded-b border-t border-t-1 border-t-gray-300">
            {props.action.operation !== "detail" && (
              <MyButton
                action="accept"
                title="Хадгалах"
                onClick={props.handleAccept}
              />
            )}
            <MyButton
              action="decline"
              title="Хаах"
              onClick={props.handleDecline}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
