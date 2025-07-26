import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Get } from "../../Api";
import { Url_Keys } from "../../Constant";
import { AboutUsType, DocumentSliceType, PrivacyPolicyType, TermsConditionType } from "../../Types/Document";

const initialState: DocumentSliceType = {
  allPrivacyPolicy: null,
  allAboutUs: null,
  allTermsCondition: null,
};

export const fetchPrivacyPoliciesApiData = createAsyncThunk<PrivacyPolicyType, void>("admin/privacy-policy", async () => {
  const response = await Get<PrivacyPolicyType>(Url_Keys.PrivacyPolicy.PrivacyPolicy);
  return response?.data!;
});

export const fetchAboutUsApiData = createAsyncThunk<AboutUsType, void>("admin/about-us", async () => {
  const response = await Get<AboutUsType>(Url_Keys.AboutUs.AboutUs);
  return response?.data!;
});

export const fetchTermsConditionApiData = createAsyncThunk<TermsConditionType, void>("admin/terms-condition", async () => {
  const response = await Get<TermsConditionType>(Url_Keys.TermsCondition.TermsCondition);
  return response?.data!;
});

const DocumentSlice = createSlice({
  name: "Document",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPrivacyPoliciesApiData.fulfilled, (state, action) => {
      state.allPrivacyPolicy = action.payload;
    });
    builder.addCase(fetchAboutUsApiData.fulfilled, (state, action) => {
      state.allAboutUs = action.payload;
    });
    builder.addCase(fetchTermsConditionApiData.fulfilled, (state, action) => {
      state.allTermsCondition = action.payload;
    });
  },
});

export default DocumentSlice.reducer;
