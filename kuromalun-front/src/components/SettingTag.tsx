import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

interface SettingTagProps {
  title: string;
  content: string;
}

const SettingTag= (props: SettingTagProps) => {
  const { title, content } = props;
  return (
    <div>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton aria-expanded="false" aria-controls="panel1" className="justify-between text-mainColor">
              {title}
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel id="panel1" p={2} className="justify-between m-3 text-mainColor">
            {content}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SettingTag;
