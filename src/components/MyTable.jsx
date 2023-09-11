import React from "react";
import MyValue from "./MyValue";
import MyIconButton from "./MyIconButton";

const MyTable = (props) => {
  return (
    <table className="text-sm w-full">
      <thead>
        <tr className="text-center h-12">
          {props.metadatas
            ?.filter((m) => m.table === true)
            ?.map((metadata, index) => {
              return (
                <td key={index} className="border border-1 border-gray-500">
                  {metadata.desc}
                </td>
              );
            })}
          <td className="border border-1 border-gray-500">Үйлдэл</td>
        </tr>
      </thead>
      <tbody>
        {props.allDatas?.map((data, index) => {
          return (
            <tr
              key={index}
              className="text-center hover:bg-yellow-100 cursor-default"
            >
              {props.metadatas
                ?.filter((m) => m.table === true)
                ?.map((metadata, index) => {
                  return (
                    <td
                      key={index}
                      className="border border-1 border-gray-500"
                      width={metadata.width}
                    >
                      <MyValue
                        value={data[metadata.name]}
                        metadata={metadata}
                        permissions={props.permissions}
                        allDatas={props.allDatas}
                      />
                    </td>
                  );
                })}
              <td className="border border-1 border-gray-500">
                <div className="flex gap-3 justify-center items-center">
                  <MyIconButton
                    action="detail"
                    onClick={props.toggleModal}
                    data={data}
                  />
                  {props.action === "default" ? (
                    <>
                      <MyIconButton
                        action="edit"
                        onClick={props.toggleModal}
                        data={data}
                      />
                    </>
                  ) : props.action === "contract" ? (
                    <>
                      <MyIconButton
                        action="edit"
                        onClick={props.toggleModal}
                        data={data}
                      />
                      <MyIconButton
                        action="link"
                        onClick={props.toggleModal}
                        data={data}
                      />
                    </>
                  ) : props.action === "user" ? (
                    <>
                      <MyIconButton
                        action="edit"
                        onClick={props.toggleModal}
                        data={data}
                      />
                      <MyIconButton
                        action="password"
                        onClick={props.toggleModal}
                        data={data}
                      />
                      <MyIconButton
                        action="link"
                        onClick={props.toggleModal}
                        data={data}
                      />
                    </>
                  ) : null}

                  {/* <MyIconButton action="save" /> */}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MyTable;
