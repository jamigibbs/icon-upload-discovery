#!/bin/sh

# Copy sprites to comp-lib Web Components package
echo "Copying to component-library web-components..."
cp sprite.svg ../component-library/packages/web-components/src/img/sprite.svg

# Copy sprites to comp-lib Storybook package
echo "Copying to component-library storybook..."
cp sprite.svg ../component-library/packages/storybook/public/img/sprite.svg

# Copy sprites to vets-website
echo "Copying to vets-website..."
cp sprite.svg ../vets-website/src/site/assets/img/sprite.svg

# Copy sprites to content-build
echo "Copying to content-build..."
cp sprite.svg ../content-build/src/site/assets/img/sprite.svg

# Copy sprites to vets-design-system-documentation
echo "Copying to vets-design-system-documentation..."
cp sprite.svg ../vets-design-system-documentation/src/img/sprite.svg

echo "Done!"
