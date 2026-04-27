import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as selectors from "../../stores/rootSelectors";
import * as actions from "../../stores/rootActions";
import type { Company } from "../../stores/company/interfaces";
import type { UserConnected } from "../../stores/auth/interfaces";
import type { AppDispatch, RootState } from "../../stores";
import { RVButton, RVLoadingButton, RVMeta, RVMainlist } from "../../components";
import {
  Container,
  FormActions,
  FormActionsLabel,
  LeftColumn,
  RightColumn,
} from "../../components/RVLayout/styles";
import { ReactHookForm, RHFInputField } from "../../components/RHF";
import { RHFform_Row, RHFform_Row_Btns } from "../../components/RHF/Form/styles";
import type { SubmitHandler } from "react-hook-form";
import { schemaCreateCompany } from "../../schemas/userSchema";

const Index = ({ dispatch, user, companies, companiesLoading }: HomeProps) => {
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [newEntry, setNewEntry] = useState<boolean | null>(null);
  const formRef = useRef("home") as any;

  useEffect(() => {
    dispatch(actions.socket.subscribeAllCompanies());
    dispatch(actions.company.getAllCompanies());

    return () => {
      dispatch(actions.socket.unsubscribeAllCompanies());
    };
  }, [dispatch]);

  useEffect(() => {
    if (companies && companies.length) {
      setCompanyList(
        companies.map((e) => {
          return {
            _id: e._id,
            name: e.name,
            ref: e.ref,
            isoCode: e.isoCode,
          };
        }),
      );
    }
  }, [companies]);

  const meta = {
    title: "Dashboard",
    description: "dashboard page",
    url: "/dashbord",
  };

  const submit: SubmitHandler<Company> = (values: Company) => {
    newEntry
      ? dispatch(
          actions.company.addOneCompany({
            data: values,
          }),
        )
      : dispatch(
          actions.company.updateOneCompany({
            params: {
              companyId: values._id,
            },
            data: values,
          }),
        );

    formRef.current?.resetForm();
  };

  const handleDeleteItem = (item: string) => {
    dispatch(
      actions.company.deleteOneCompany({
        params: {
          companyId: item,
        },
      }),
    );
  };

  const handleEditModal = (data: Company) => {
    setNewEntry(false);
    formRef.current?.resetForm({
      _id: data._id,
      name: data.name,
      ref: data.ref,
      isoCode: data.isoCode,
    });
  };

  const handleNewModal = () => {
    formRef.current?.resetForm();
  };

  return (
    <>
      <RVMeta metaData={meta} />

      <Container>
        <LeftColumn>
          <h3>{user?.userPermissions.email}</h3>
          <p>
            <strong>Cache definition</strong> for every viewed company detail pages. It prevents
            from making any <strong>unnecessary requests</strong> twice. Content is stored in a Map.
            It could be sessionStorage
          </p>
          <p>
            Home page is using <strong>URF</strong> forms. User profil has been built with UseReactForm.{" "}
            <strong>Create User</strong> page uses old <strong>Formik</strong> form library.
          </p>
          <FormActions>
            <RVButton
              content={newEntry ? "Close" : "Add new entry"}
              onClick={() => {
                handleNewModal();
                setNewEntry(!newEntry);
              }}
            />

            <FormActionsLabel>{newEntry ? "Add new entry" : "Edit document"}</FormActionsLabel>
          </FormActions>

          <ReactHookForm
            ref={formRef}
            defaultValues={{
              _id: "",
              name: "",
              ref: "",
              isoCode: "",
            }}
            validationSchema={schemaCreateCompany}
          >
            {({ control, handleSubmit, reset }) => (
              <RHFform_Row onSubmit={handleSubmit(submit)}>
                <RHFInputField control={control} label="First name" name="_id" hidden />
                <RHFInputField control={control} label="Company name" name="name" />
                <RHFInputField control={control} label="Reference" name="ref" />
                <RHFInputField control={control} label="isoCode" name="isoCode" />

                <RHFform_Row_Btns> 
                  <RVLoadingButton type="submit" content="Submit" />
                  <RVLoadingButton type="button" content="Reset" onClick={() => reset()} />
                </RHFform_Row_Btns>
               
              </RHFform_Row>
            )}
          </ReactHookForm>
        </LeftColumn>
        <RightColumn>
          {(companiesLoading && <div>Is loading...</div>) ||
            (companyList &&
              companyList.map((c) => (
                <RVMainlist
                  key={c._id}
                  data={c}
                  handleEditModal={handleEditModal}
                  handleDeleteItem={handleDeleteItem}
                />
              )))}
        </RightColumn>
      </Container>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: selectors.auth.authSelector(state),
    companies: selectors.company.companiesSelector(state),
    companiesLoading: selectors.company.companiesLoadingSelector(state),
    saveLoading: selectors.company.addCompanyLoadingSelector(state),
    addCompanySuccess: selectors.company.addCompanySuccessSelector(state),
  };
};

interface HomeProps {
  user: UserConnected | null;
  companies: Company[] | null;
  companiesLoading: boolean;
  saveLoading: boolean;
  addCompanySuccess: Company[] | boolean;
  dispatch: AppDispatch;
}

export default connect(mapStateToProps)(Index);
