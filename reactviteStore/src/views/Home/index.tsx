import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Formiz, useForm } from "@formiz/core";
import { isRequired } from "@formiz/validations";
import * as selectors from "../../stores/rootSelectors";
import * as actions from "../../stores/rootActions";
import type { Company } from "../../stores/company/interfaces";
import type { AppDispatch, RootState } from "../../stores";
import { RVButton, RVInput, RVLoadingButton } from "../../components";
import { BthForm, Container, Form, FormActions, FormActionsLabel, LeftColumn, RightColumn } from "../../components/RVLayout/styles";
import MainList from "../../components/RVMainlist";

const Index = ({ dispatch, companies, companiesLoading, saveLoading }: HomeProps) => {
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [newEntry, setNewEntry] = useState<boolean | null>(null);

  useEffect(() => {
    dispatch(actions.socket.subscribeAllCompanies());
    dispatch(actions.company.getAllCompanies());

    return () => {
      dispatch(actions.company.reset(["companies"]));
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

  const form = useForm({
    initialValues: {
      _id: "",
      name: "",
      ref: "",
      isoCode: "",
    },
    onSubmit: (values) => {
      if (!newEntry) {
        handleSubmitUpdate(values);
        form.reset();
      } else {
        handleSubmitCreate(values);
        form.reset();
      }
    },
  });

  const handleSubmitUpdate = (values: Company) => {
    dispatch(
      actions.company.updateOneCompany({
        params: {
          companyId: values._id,
        },
        data: values,
      }),
    );
  };

  const handleSubmitCreate = (values: Company) => {
    dispatch(
      actions.company.addOneCompany({
        data: values,
      }),
    );
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
    form.setValues({
      _id: data._id,
      name: data.name,
      ref: data.ref,
      isoCode: data.isoCode,
    });
  };

  const handleNewModal = () => {
    form.reset();
  };

  return (
    <Container>
      <LeftColumn>
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

        <Formiz connect={form}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              form.submit();
            }}
          >
            <RVInput
              name="_id"
              type="hidden"
              id="01"
              required="Email is required"
              validations={[
                {
                  handler: isRequired(),
                  message: "id is required",
                },
              ]}
            />
            <RVInput
              name="name"
              type="text"
              id="1"
              label="Company name"
              required="Company name is required"
              validations={[
                {
                  handler: isRequired(),
                  message: "Company name is required",
                },
              ]}
            />
            <RVInput
              name="ref"
              type="text"
              id="2"
              label="Company ref"
              required="Ref is required"
              validations={[
                {
                  handler: isRequired(),
                  message: "Ref is required",
                },
              ]}
            />
            <RVInput
              name="isoCode"
              type="text"
              id="3"
              label="Company isoCode"
              required="isoCode is required"
              validations={[
                {
                  handler: isRequired(),
                  message: "isoCode is required",
                },
              ]}
            />
            <BthForm>
              <RVLoadingButton type="submit" content="Submit" disabled={saveLoading} loading={saveLoading} />
            </BthForm>
          </Form>
        </Formiz>
      </LeftColumn>
      <RightColumn>{(companiesLoading && <div>Is loading...</div>) || (companyList && companyList.map((c) => <MainList key={c._id} data={c} handleEditModal={handleEditModal} handleDeleteItem={handleDeleteItem} />))}</RightColumn>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    companies: selectors.company.companiesSelector(state),
    companiesLoading: selectors.company.companiesLoadingSelector(state),
    saveLoading: selectors.company.addCompanyLoadingSelector(state),
    addCompanySuccess: selectors.company.addCompanySuccessSelector(state),
  };
};

interface HomeProps {
  companies: Company[] | null;
  companiesLoading: boolean;
  saveLoading: boolean;
  addCompanySuccess: Company[] | boolean;
  dispatch: AppDispatch;
}

// export default App
export default connect(mapStateToProps)(Index);
