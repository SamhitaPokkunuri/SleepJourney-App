function appendToParent(array, parentId, navLink) {
  array.forEach((obj) => {
    // If children exist check for parent
    if (obj.children.length > 0) {
      appendToParent(obj.children, parentId, navLink);
    }
    // When the parent is found push the nav link to children
    if (obj.id === parentId) {
      obj.children.push(navLink);
    }
  });
}

export default function orderNavigation(navlinks, navItem) {
  const { title, link, parent } = navItem.attributes;
  const parentId = typeof parent === 'string' ? parent.split(':')[1] : null;

  const navLink = {
    id: navItem.id,
    attributes: {
      title,
      link,
      parentId,
    },
    children: [],
  };

  if (parentId) {
    // If we have a parent ID we have a parent to append the child
    appendToParent(navlinks, parentId, navLink);
  } else {
    // Returns the top level links
    return [...navlinks, navLink];
  }

  return navlinks;
}
