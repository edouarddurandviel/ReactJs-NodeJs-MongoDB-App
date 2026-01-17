import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import * as selectors from "../../stores/rootSelectors";
import * as actions from "../../stores/rootActions";
import type { Company } from "../../stores/company/interfaces";
import type { AppDispatch, RootState } from "../../stores";
import { Container } from "../../components/RVLayout/styles";

const Index = ({ dispatch, company, companyLoading }: DetailsProps) => {
  const [companyDetail, setCompanyDetail] = useState<Company | null>(null);
  const { companyId } = useParams();

  useEffect(() => {
    if (companyId) {
      dispatch(
        actions.company.getOneCompany({
          params: {
            companyId: companyId,
          },
        }),
      );

      dispatch(actions.socket.subscribeOneCompany(companyId));
    }

    return () => {
      if (companyId) {
        dispatch(actions.company.reset(["company"]));
        dispatch(actions.socket.unsubscribeOneCompany(companyId));
      }
    };
  }, [dispatch, companyId]);

  useEffect(() => {
    if (company) {
      setCompanyDetail(company);
    }
  }, [company]);

  return (
    <Container>
      Company detail
      {companyLoading && <p>Loading...</p>}
      {companyDetail && (
        <>
          <p>{companyDetail.name}</p>
          <p>{companyDetail.isoCode}</p>
        </>
      )}
    </Container>
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

// export default App
export default connect(mapStateToProps)(Index);
