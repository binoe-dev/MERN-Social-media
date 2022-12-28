import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import "../../styles/group_modal.css";
import { postDataAPI, getDataAPI } from "../../utils/fetchData";
import SearchResult from "./SearchResult";

const Modal = ({ onClick }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleCreateGroup = async () => {
    if (!groupChatName || !selectedUsers) {
      return;
    }

    try {
      const res = await postDataAPI(
        "group",
        {
          groupConversationName: groupChatName,
          recipientsString: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        auth.token
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setSearchResult(res.data.users);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  return (
    <>
      <div className="backdrop" onClick={onClick}></div>
      <div className="modalCard">
        {/* 1-form */}
        <form className="createGroup" onSubmit={handleCreateGroup}>
          <input
            type="text"
            placeholder="Chat Name"
            onChange={(e) => setGroupChatName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Users"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>

        {/* 2-badge */}
        <div className="badgeContainer">
          {selectedUsers?.map((user) => (
            <div className="groupBadge" key={user.username}>
              <span className="badgeContent">{user.username}</span>
            </div>
          ))}
        </div>

        {/* 3-search result */}
        <div className="resultContainer">
          {searchResult?.map((user) => (
            <div
              className="searchResult-container"
              key={user._id}
              onClick={() => handleGroup(user)}
            >
              <SearchResult user={user} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Modal;
