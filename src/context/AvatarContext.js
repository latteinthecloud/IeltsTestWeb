import React, { createContext, useState, useContext, useEffect} from "react";
import { useAuth } from "./AuthContext";
import accountApi from "../api/accountApi";

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatar, setAvatar] = useState("");
  const {user} = useAuth();

    useEffect(() => {
      const fetchAvatar = async () => {
        try {
          const response = await accountApi.getAvatar(user.id);
          if(response)
            setAvatar("http://localhost:8080" + response);
          else setAvatar("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREcz4lE7FQCPF544vc-fFQSPJNyRtqwNdRzg&s");
        } catch (error) {
          console.error("Error fetching avatar:", error);
        }
      };

      if (user?.id) fetchAvatar();
    }, [user]);

  return (
    <AvatarContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  return useContext(AvatarContext);
};
