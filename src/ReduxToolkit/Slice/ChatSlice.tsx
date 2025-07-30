import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Url_Keys } from "../../Constant";
import { Get } from "../../Api";
import { FetchApiParams } from "../../Types/CoreComponents";
import { ChatApiResponse, ChatSliceType } from "../../Types/Chat";

const initialState: ChatSliceType = {
  isChatModal: false,
  allChat: null,
  isLoadingChat: true,
  singleEditingIdChat: null,
  singleChatData: null,
  selectedUser: null,
  isChatSearchData:null
};

export const fetchChatApiData = createAsyncThunk<ChatApiResponse, FetchApiParams>("admin/Chat", async ({ senderId, receiverId }) => {
  let url = Url_Keys.Chat.Chat;
  if (senderId) url += `?senderId=${senderId}&receiverId=${receiverId}`;
  const response = await Get<ChatApiResponse>(url);
  return response?.data;
});

// export const fetchSingleChatApiData = createAsyncThunk<ChatType, FetchApiParams>("admin/single-Chat", async ({ id }) => {
//   const response = await Get<ChatType>(`${Url_Keys.Chat.Chat}/${id}`);
//   return response?.data;
// });

const ChatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    setChatModal: (state) => {
      state.isChatModal = !state.isChatModal;
    },
    setSingleEditingIdChat(state, action) {
      state.singleEditingIdChat = action.payload;
    },
    setSelectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setChatSearchData(state, action) {
      state.isChatSearchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatApiData.fulfilled, (state, action) => {
      state.allChat = action.payload;
      state.isLoadingChat = false;
    });
    // builder.addCase(fetchSingleChatApiData.fulfilled, (state, action) => {
    //   state.singleChatData = action.payload;
    // });
  },
});

export const { setChatModal, setSingleEditingIdChat, setSelectUser ,setChatSearchData} = ChatSlice.actions;
export default ChatSlice.reducer;
