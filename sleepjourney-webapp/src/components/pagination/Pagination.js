//Application dependencies
import { useContext } from 'react';

// Vendor and internal dependencies
import { ChevronButton } from 'components';
import { ThemeContext } from '../layout/FoundationPage';

export default function Pagination(props) {
  const { disabled, loadMoreArticles, noPost } = props;
  const context = useContext(ThemeContext);
  const isFoundation = context === 'foundation';

  // return type === 'load-more' ? (
  // TODO: Pagination
  // For now only load more is available, to be replaced with pagination
  return (
    !noPost && (
      <ChevronButton
        disabled={disabled}
        onClick={loadMoreArticles}
        rounded={isFoundation}
        customColors={{ text: '#FFFFFF', background: 'rgb(230, 0, 0)' }}
      >
        Load More
      </ChevronButton>
    )
  );
}
