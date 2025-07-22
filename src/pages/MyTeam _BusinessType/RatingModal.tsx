import React, { useEffect } from "react";
import { Rate } from "antd";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Modals } from "../../common-components/modal";
import ButtonComp from "../../common-components/button";
import InputComponent from "../../common-components/input";
import { ExpertProfileState } from "../../store/AllExpertsProfiles/AllExpertsProfile";
import {
  postExpertRating,
  fetchExpertRateData,
  updateExpertRating,
  RateExpertState,
} from "../../store/ExpertRateSlice/ExpertRatingSlice";
import { Expert } from "../../store/HiredExpertsList/HiredExpertsListSlice";
import { AppDispatch } from "../../store/root-store";
interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancelRating: () => void;
  userRating: number;
  setUserRating: React.Dispatch<React.SetStateAction<number>>;
  selectedCard: Expert | null | undefined;
}
const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  onCancelRating,
  setUserRating,
  selectedCard,
}) => {
  const dispatch:AppDispatch = useDispatch();
  const [form] = Form.useForm();
//fetching rating modal data everytime when rating Modal is opened
  useEffect(() => {
    if (isOpen && selectedCard) {
      dispatch(fetchExpertRateData());
    }
  }, [isOpen, selectedCard, dispatch]);

  const expertRating = useSelector(
    (state: { expertRate: RateExpertState }) => state.expertRate.expertRate
  );
  const expertProfiles = useSelector(
    (state: { expertProfiles: ExpertProfileState }) =>
      state.expertProfiles.expertProfiles
  );
/*Logic for displaying the expert rating and description  in modal whose rating is already posted by business usertype
 by matching the name of that particular expert .*/
  useEffect(() => {
    const ratingData = expertRating.find(
      (rating) => rating.user === selectedCard?.name_of_expert
    );

    if (ratingData) {
      form.setFieldsValue({
        value: ratingData.value,
        discription: ratingData.discription || "",
      });
      setUserRating(ratingData.value)
    }
  }, [expertRating, expertProfiles, selectedCard, form, setUserRating]);
// Logic for submitting rateForm
  const onFinish =  (values: { value: number; discription: string }) => {
    //Matching name of specfic expert with the expert names in expert profiles to return its id and set it to backend
    const expertProfile = expertProfiles.find(
      (profile) => profile.full_name === selectedCard?.name_of_expert
    );

    if (expertProfile) {
      const rateFormData = {
        user: expertProfile.id || 0,
        value: values.value,
        discription: values.discription || "",
      };
      let Id: number | undefined = undefined;
      
      /*checking if the rating for particular expert has already been submitted , by matching experts name ,
      if yes then it did not post new rating and description it just update previous rating and description*/

      const ratingData = expertRating.find(
        (rating) => rating.user === selectedCard?.name_of_expert
      );

      if (ratingData) {
        Id = ratingData.id;
        dispatch(updateExpertRating({ Id, rateForm: rateFormData }));
      }
     else{
        dispatch(postExpertRating(rateFormData));
      }
       
      }
    

    onClose();
  };

  return (
    <Modals
      title="Expert Rating"
      open={isOpen}
      width="500px"
      height="200px"
      onClose={onClose}
    >
      <Form onFinish={onFinish} form={form}>
        <div className="mt-6 mb-4">
          <h2 className="block text-xs md:text-sm lg:text-base xl:text-g text-[#808080] khula-text font-semibold leading-normal mb-2">
            Rating
          </h2>
          <Form.Item
            name="value"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Rate
              allowHalf
              style={{ fontSize: 24 }}
              allowClear={true}
            />
          </Form.Item>
        </div>
        <div>
          <h2 className="font-[12px] text-[#808080] khula-text ">Expert</h2>

          <div className=" mt-2 pt-3 pl-4 w-full h-[49px] bg-[#EFEFEF] font-[16px] text-gray-400 khula-text rounded-[8px]">
            {selectedCard?.name_of_expert}
          </div>
        </div>
        <div className="mt-3">
          <Form.Item
            name="discription"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <InputComponent
              type="textarea"
              rows={5}
              placeholder="Type here"
              label="Description"
            />
          </Form.Item>
        </div>
        <div className="flex-row mt-7 mb-8 justify-center items-center">
          <ButtonComp
            text="Cancel"
            size="medium"
            className="ml-16 mr-5 h-[50px]"
            onClick={onCancelRating}
          />
          <ButtonComp
            text="Submit"
            size="medium"
            variant="violet"
            className="h-[50px]"
            htmlType="submit"
          />
        </div>
      </Form>
    </Modals>
  );
};

export default RatingModal;
