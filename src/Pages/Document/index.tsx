import React, { Fragment } from "react";
import AboutUsContainer from "./AboutUsContainer";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";
import PrivacyPoliciesContainer from "./PrivacyPolicies";
import TermsConditionsContainer from "./TermsConditions";

const Document = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Document" parent="Pages" />
      <AboutUsContainer />
      <PrivacyPoliciesContainer />
      <TermsConditionsContainer />
    </Fragment>
  );
};

export default Document;
