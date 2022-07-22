import React from "react";

function category({ data }) {
  console.log(data);
  return (
    <div className="mx-auto w-full text-violet-500 flex justify-center">
      Hi category : {data.category}
    </div>
  );
}

export default category;

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          category: "لبنیات",
        },
      },
    ],
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  console.log(params);
  const data = params;
  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}
