// Application dependencies
import React from 'react';

// Vendor and internal dependencies
import { ContentList, Section, Columns, Column, Heading } from 'components';
import { getCategory } from 'lib/graphql/getCategory';

export async function getServerSideProps() {
  const response = await getCategory('vodafone-foundation');
  const { entity } = response;
  const { entityId, entityLabel } = entity;

  return {
    props: {
      category: {
        categoryName: entityLabel,
        categoryID: entityId,
      },
    }, // will be passed to the page component as props
  };
}

export default function RelatedArticles(props) {
  const { categoryID, postID } = props;

  const relatedProps = {
    customColors: {
      text: '',
      background: '#F4F4F4',
    },
    backgroundDivider: {
      hasDivider: false,
    },
    backgroundAnimation: {
      hasAnimation: false,
    },
  };

  return (
    <Section {...relatedProps}>
      <Columns>
        <Column key="header-col-1" width={70}>
          <Heading variant="h2">More stories</Heading>
        </Column>
        <Column key="header-col-2" width={30} />
      </Columns>
      <ContentList
        customContentList={true}
        title="category"
        contentStyle={[3]}
        showCategory={true}
        showDate={true}
        showDescription={true}
        showImages={true}
        showShareIcons={true}
        showTags={true}
        sources={{
          mode: 'child',
          maxArticles: 4,
          categories: [categoryID],
          sortRule: 'date',
          sortingDirection: 'desc',
          excludePost: postID,
        }}
      />
    </Section>
  );
}
