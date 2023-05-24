export const fetchUsers = () => {
    return fetch("https://646ccfa77b42c06c3b2c1255.mockapi.io/Users/users").then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error" + response.status);
        // .then(responce.data);
      }
    );
  };