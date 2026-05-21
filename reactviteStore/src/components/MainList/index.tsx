import ButtonLink from "../ButtonLink";
import type { Company } from "../../stores/company/interfaces";
import { ItemList, ItemListLeft, ItemListRight, SpanIso, SpanTitle, SpanRef } from "./style";
import Button from "../Button";

const Index = ({ data, handleEditModal, handleDeleteItem }: MainListProps) => {
  return (
    <ItemList key={data._id}>
      <ItemListLeft>
        <SpanTitle>{data.name}</SpanTitle>
        <SpanRef>{data.ref}</SpanRef>
        <SpanIso>{data.isoCode}</SpanIso>
      </ItemListLeft>

      <ItemListRight>
        <Button
          content="Edit"
          onClick={() => {
            handleEditModal(data);
          }}
        />

        <Button
          content="Delete"
          onClick={() => {
            handleDeleteItem(data._id);
          }}
        />

        <ButtonLink path={`/detail/${data._id}`} text="View" />
      </ItemListRight>
    </ItemList>
  );
};

interface MainListProps {
  data: any;
  handleEditModal: (data: Company) => void;
  handleDeleteItem: (item: string) => void;
}

export default Index;
