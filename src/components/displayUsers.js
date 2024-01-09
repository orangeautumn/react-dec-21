import React, { useEffect, useState } from "react";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3400",
});
const DisplayUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      axiosInstance.get("/load").then((resp) => {
        console.log("resp-load-cal->", resp);
        setUsers(resp?.data?.data?.temp);
      });
    } catch (err) {
      console.log("error--->", err);
    }

    // fetch("http://localhost:3400/load").then((resp) =>
    //   resp?.json().then((resp) => {
    //     console.log("resp-->", resp?.data?.temp);
    //     setUsers(resp?.data?.temp);
    //   })
    // );
  }, []);

  return (
    <>
      <h3>DisplayUsers </h3>
      {users?.length ? (
        users?.map((user, indexedDB) => {
          return (
            <>
              <ul key={indexedDB}>
                {user?.id} -- {user?.name}
              </ul>
            </>
          );
        })
      ) : (
        <p> No Users -- - </p>
      )}
    </>
  );
};

export default DisplayUsers;
