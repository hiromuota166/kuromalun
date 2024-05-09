'use client'

interface LinkInItemProps {
  text: string;
  exampletext: string;
}

const LinkInItem = (props: LinkInItemProps) => {
  const { text, exampletext } = props;
  return (
    <div>
      <p>{text}</p>
      <textarea 
        placeholder={exampletext}
        className="md:w-full"
      />
  </div>
  )
}

export default LinkInItem