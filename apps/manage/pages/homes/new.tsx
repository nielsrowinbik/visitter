import { FormPageLayout } from "@components/Layouts/FormPageLayout";
import { HomeAddForm } from "@components/HomeAddForm";

const Page = () => <HomeAddForm />;

Page.getLayout = (page: any) => <FormPageLayout>{page}</FormPageLayout>;

export default Page;
