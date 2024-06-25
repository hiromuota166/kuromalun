'use client'

interface LinkInItemProps {
  text: string;
  exampleText: string;
}

const LinkInItem = (props: LinkInItemProps) => {
  const { text, exampleText } = props;
  return (
    <div>
      <p>{text}</p>
      <textarea 
        placeholder={exampleText}
        className="md:w-full"
      />
  </div>
  )
}

export default LinkInItem