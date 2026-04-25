import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import * as selectors from "../../stores/rootSelectors";
import * as actions from "../../stores/rootActions";
import type { Company } from "../../stores/company/interfaces";
import type { AppDispatch, RootState } from "../../stores";
import { Container, InlineWrapper } from "../../components/RVLayout/styles";
import { RVButton, RVMeta } from "../../components";

const Index = ({ dispatch, company, companyLoading }: DetailsProps) => {
  const [companyDetail, setCompanyDetail] = useState<Company | null>(null);
  const { companyId } = useParams();

  useEffect(() => {
    dispatch(
      actions.company.getOneCompany({
        params: {
          companyId: companyId,
        },
      }),
    );

    dispatch(actions.socket.subscribeOneCompany(companyId));

    return () => {
      dispatch(actions.socket.unsubscribeOneCompany(companyId));
    };
  }, [dispatch, companyId]);

  useEffect(() => {
    if (company) {
      setCompanyDetail(company);
    }
  }, [company]);

  const meta = {
    title: "Company details",
    description: "Company details page",
    url: `/detail/${companyId}`,
  };

  return (
    <>
      <RVMeta metaData={meta} />
      <Container>
        <RVButton
          content="Back"
          onClick={() => {
            history.back();
          }}
        />
        <h2>Company detail</h2>

        {companyLoading && <p>Loading...</p>}
        {companyDetail && (
          <InlineWrapper>
            <p>{companyDetail.name}</p>
            <p>{companyDetail.isoCode}</p>
          </InlineWrapper>
        )}
      </Container>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    company: selectors.company.companySelector(state),
    companyLoading: selectors.company.companyLoadingSelector(state),
  };
};

interface DetailsProps {
  company: Company | null;
  companyLoading: boolean;
  dispatch: AppDispatch;
}

export default connect(mapStateToProps)(Index);
