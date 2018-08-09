import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Lightbox from 'react-images'
import { toast } from 'react-toastify'
import { Row, Col } from 'react-simple-flex-grid'
import 'react-simple-flex-grid/lib/main.css'

import {
  FeaturedSection,
  Toast,
  SizesButtonGroup,
  QuantityControls,
} from '../components'
import { H1, GhostButtonLink, FeaturedButton } from '../components/styled'

import colors from '../utils/colors'
import { totalAvailableQuantity } from '../utils/utilFunctions'
import { theme } from '../utils/lightboxTheme'

const Image = styled.img`
  cursor: pointer;
  width: 18.75rem;
  margin-right: 0.5rem;
`
const SmallImage1 = styled.img`
  max-width: 8rem;
  &:hover {
    cursor: pointer;
  }
`
const SmallImage2 = styled(SmallImage1)`
  margin-left: 0.5rem;
`

const ErrorMsg = styled.p`
  color: ${colors.red};
`

const FreeDeliveryMsg = styled.p`
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
  color: ${colors.main};
`

const DescriptionMsg = styled.p`
  max-width: 20rem;
`

const P = styled.p`
  margin-top: 1rem;
  margin-bottom: 0.8rem;
`

const ProductPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`

const ProductPrice = styled.h3`
  color: ${({ crossout }) => (crossout ? colors.darkGrey : colors.main)};
  padding-right: 1rem;
  margin-top: 0.7rem;
  text-decoration: ${({ crossout }) => (crossout ? 'line-through' : 'none')};
  font-size: ${({ crossout }) => (crossout ? '1.5rem' : '2rem')};
  font-weight: 400;
`

const ClickToZoom = styled.div`
  opacity: 0.8;
  color: ${colors.white};
  position: absolute;
  bottom: 1rem;
  right: 5rem;
  background-color: ${colors.darkGrey};
  border-radius: 0.75rem;
  padding: 0.1rem 0.6rem;
  font-size: 0.7rem;
  cursor: pointer;
`

class ProductTemplate extends React.Component {
  state = {
    quantityValue: 1,
    minimumQuantity: 1,
    maximumQuantity: 8,
    disableMinusButton: true,
    disablePlusButton: false,
    errorMsgShow: false,
    mainImage: {
      src: '',
      index: '',
    },
    sizeChoice: '',
    displayError: false,
    currentImage: 0,
    lightboxIsOpen: false,
  }

  componentDidMount() {
    const {
      node: productData,
    } = this.props.data.allContentfulProduct.edges.find(
      ({ node }) => node.slug === this.props.pathContext.slug
    )
    this.setState({
      mainImage: { src: productData.photos[0].resolutions.src, index: 0 },
    })
  }

  addToCart = productData => {
    if (!this.checkDisabledSubmit()) {
      this.setState({ displayError: false })
      if (typeof window !== 'undefined' && window.localStorage) {
        let oldItems = JSON.parse(localStorage.getItem('cart')) || []
        let updateQuantity = false
        for (const savedItem of oldItems) {
          if (
            savedItem.contentful_id === productData.contentful_id &&
            savedItem.selectedSize === this.state.sizeChoice
          ) {
            updateQuantity = true
            savedItem.quantity =
              Number(this.state.quantityValue) + Number(savedItem.quantity)
          }
        }

        if (!updateQuantity)
          oldItems.push({
            contentful_id: productData.contentful_id,
            name: productData.name,
            price: productData.isOnSale
              ? productData.onSalePrice
              : productData.price,
            slug: productData.slug,
            quantity: this.state.quantityValue,
            selectedSize: this.state.sizeChoice,
          })

        localStorage.setItem('cart', JSON.stringify(oldItems))
        let cartItems = JSON.parse(localStorage.getItem('cart')).length || 0
        this.props.updateCartItemsCount(cartItems)
        this.successAddedItemToast()
      }
    } else {
      this.setState({ displayError: true })
    }
  }

  checkOutOfQuantityRange() {
    Number(this.state.quantityValue) <= this.state.minimumQuantity
      ? this.setState({ disableMinusButton: true })
      : this.setState({ disableMinusButton: false })
    Number(this.state.quantityValue) < this.state.minimumQuantity
      ? this.setState({ errorMsgShow: true })
      : this.setState({ errorMsgShow: false })
    Number(this.state.quantityValue) >= this.state.maximumQuantity
      ? this.setState({ disablePlusButton: true })
      : this.setState({ disablePlusButton: false })
    Number(this.state.quantityValue) > this.state.maximumQuantity
      ? this.setState({ errorMsgShow: true })
      : this.setState({ errorMsgShow: false })
  }

  decreaseQuantity() {
    this.setState(
      currState => {
        quantityValue: currState.quantityValue -= 1
      },
      () => this.checkOutOfQuantityRange()
    )
  }

  increaseQuantity() {
    this.setState(
      currState => {
        quantityValue: currState.quantityValue += 1
      },
      () => this.checkOutOfQuantityRange()
    )
  }

  //TODO: Maybe we can display a little info for the product itself
  successAddedItemToast = () =>
    toast(
      () => (
        <div style={{ color: colors.white }}>
          <div>Продуктът беше добавен! 😎</div>
          <Link style={{ color: colors.white }} to="/cart">
            Виж количка
          </Link>
        </div>
      ),
      { className: 'gold-background' }
    )

  changeMainImage(e, index) {
    this.setState({ mainImage: { src: e.target.src, index: index } })
  }

  showAvailableSizes(sizes) {
    let availableSizes = {}
    for (const key in sizes) {
      if (sizes[key] !== null && sizes[key] !== 0)
        availableSizes[key] = sizes[key]
    }
    return Object.keys(availableSizes)
  }

  updateSizeSelection(e) {
    this.setState({ sizeChoice: e.id, displayError: false })
  }

  checkDisabledSubmit() {
    return (
      this.state.quantityValue < this.state.minimumQuantity ||
      this.state.quantityValue > this.state.maximumQuantity ||
      this.state.sizeChoice === ''
    )
  }

  openLightbox = (event, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    })
  }
  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })
  }
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }

  render() {
    const {
      node: productData,
    } = this.props.data.allContentfulProduct.edges.find(
      ({ node }) => node.slug === this.props.pathContext.slug
    )

    const photos = productData.photos.map((e, idx) => {
      return {
        src: e.resolutions.src,
        srcSet: e.resolutions.srcSet.split(',\n'),
        tracedSVG: e.resolutions.tracedSVG,
        alt: e.title,
        index: idx,
      }
    })
    const totalQuantity = totalAvailableQuantity(productData.sizes)
    const availableSizes = this.showAvailableSizes(productData.sizes)
    const allProducts = this.props.data.allContentfulProduct
    return (
      <div>
        <Row justify={'center'}>
          <Col xs={12} sm={5} md={5} lg={5} xl={5}>
            <Row justify={'end'}>
              <Col
                xs={12}
                sm={12}
                md={{ span: 10, offset: 2 }}
                lg={{ span: 10, offset: 2 }}
                xl={{ span: 10, offset: 2 }}
                onClick={(e, o) => this.openLightbox(e, this.state.mainImage)}
              >
                <ClickToZoom>CLICK TO ZOOM</ClickToZoom>
                <Image src={this.state.mainImage.src} />
              </Col>
            </Row>
            <Row justify={'end'}>
              <Col
                xs={12}
                sm={12}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 12 }}
              >
                <div>
                  <SmallImage1
                    onClick={e => this.changeMainImage(e, 0)}
                    src={productData.photos[0].resolutions.src}
                  />
                  <SmallImage2
                    onClick={e => this.changeMainImage(e, 1)}
                    src={productData.photos[1].resolutions.src}
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={7} md={7} lg={7} xl={7}>
            {productData.isOnSale &&
              totalQuantity > 0 && (
                <div
                  style={{
                    color: colors.main,
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  ПРОМОЦИЯ
                </div>
              )}
            {totalQuantity < 5 &&
              totalQuantity > 0 && (
                <span
                  style={{
                    color: colors.red,
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  ПОСЛЕДНИ БРОЙКИ
                </span>
              )}
            <H1>{productData.name}</H1>
            <DescriptionMsg>{productData.description}</DescriptionMsg>
            <ProductPriceWrapper>
              <ProductPrice crossout={totalQuantity === 0}>
                {productData.onSalePrice && productData.onSalePrice}лв.
              </ProductPrice>
              {productData.isOnSale &&
                productData.onSalePrice &&
                totalQuantity !== 0 && (
                  <ProductPrice crossout={true}>
                    {productData.price}лв.
                  </ProductPrice>
                )}
            </ProductPriceWrapper>
            {totalQuantity > 0 ? (
              <div>
                <FreeDeliveryMsg>Безплатна доставка</FreeDeliveryMsg>

                <P>Размер</P>
                <SizesButtonGroup
                  sizes={availableSizes}
                  selected={this.state.sizeChoice}
                  onChange={e => this.updateSizeSelection(e)}
                />
                <P>Количество</P>
                <QuantityControls
                  decreaseTrigger={() => this.decreaseQuantity()}
                  increaseTrigger={() => this.increaseQuantity()}
                  disableMinusButton={this.state.disableMinusButton}
                  disablePlusButton={this.state.disablePlusButton}
                  value={this.state.quantityValue}
                />
              </div>
            ) : (
              <div
                style={{
                  color: colors.darkGrey,
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  marginTop: '2rem',
                }}
              >
                ИЗЧЕРПАНО
              </div>
            )}
            <br />
            <FeaturedButton
              grayedOut={!this.state.sizeChoice}
              onClick={() => this.addToCart(productData)}
              disabled={totalQuantity <= 0}
            >
              Добави в количката
            </FeaturedButton>
            {this.state.displayError && (
              <ErrorMsg>Моля изберете размер</ErrorMsg>
            )}
            {this.state.errorMsgShow && (
              <p>Броя артикули може да е между 1 и 8.</p>
            )}
          </Col>
        </Row>
        <br />
        {/* <FeaturedSection filterOut={productData} allProducts={allProducts} /> */}
        <Toast />
        <Lightbox
          images={photos}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          onClickImage={this.gotoNext}
          backdropClosesModal
          imageCountSeparator=" / "
          spinnerColor={colors.main}
          spinnerSize={150}
          theme={theme}
        />
      </div>
    )
  }
}

export default ProductTemplate

export const productQuery = graphql`
  query ProductQuery {
    allContentfulProduct {
      edges {
        node {
          slug
          name
          isFeatured
          isOnSale
          onSalePrice
          price
          description
          contentful_id
          createdAt
          updatedAt
          photos {
            id
            title
            resolutions(width: 500, height: 500) {
              src
              srcSet
              tracedSVG
            }
          }
          sizes {
            XS
            S
            M
            L
            XL
            OneSize
          }
        }
      }
    }
  }
`
