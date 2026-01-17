import RVButtonLink from "../RVButtonLink";
import type { Company } from "../../stores/company/interfaces";
import { ItemList, ItemListLeft, ItemListRight, SpanIso, SpanTitle, SpanRef } from "./style";
import RVButton from "../RVButton";

const Index = ({ data, handleEditModal, handleDeleteItem }: MainListProps) => {
  return (
    <ItemList key={data._id}>
      <ItemListLeft>
        <SpanTitle>{data.name}</SpanTitle>
        <SpanRef>{data.ref}</SpanRef>
        <SpanIso>{data.isoCode}</SpanIso>
      </ItemListLeft>

      <ItemListRight>
        <RVButton
          content="Edit"
          onClick={() => {
            handleEditModal(data);
          }}
        />

        <RVButton
          content="Delete"
          onClick={() => {
            handleDeleteItem(data._id);
          }}
        />

        <RVButtonLink path={`/detail/${data._id}`} text="View" />
      </ItemListRight>
    </ItemList>
  );
};

type MainListProps = {
  data: any;
  handleEditModal: (data: Company) => void;
  handleDeleteItem: (item: string) => void;
};

export default Index;
