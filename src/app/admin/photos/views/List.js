import React from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'
import { Redirect } from '@reach/router'

import Pager from '../../components/Pager'
import Toolbar from '../../components/Toolbar'
import List from '../../components/List'
import { ButtonLink } from '../../components/Links'
import { IconPlus } from '../../components/Icons'
import Loader from '../../components/Loader'

import Photo from './Photo'

const regex = /^(new|(\d+\/(edit|delete)))?$/

class Photos extends React.Component {
  componentDidMount() {
    const query = qs.parse(this.props.location.search.substring(1))
    const params = {}

    if (query.page !== undefined) {
      params['page'] = query.page
    }

    this.props.loadPhotos(params)
  }

  componentDidUpdate(prevProps) {
    const prevQuery = qs.parse(prevProps.location.search.substring(1))
    const query = qs.parse(this.props.location.search.substring(1))

    if (prevQuery.page !== query.page) {
      this.props.loadPhotos({ page: query.page })
      window.scrollTo(0, 0)
    }
  }

  onDelete = (id, event) => {
    event.preventDefault()
    this.props.navigate(`${id}/delete`)
  }

  onEdit = (id, event) => {
    event.preventDefault()
    this.props.navigate(`${id}/edit`)
  }

  render() {
    const { photos } = this.props
    const path = this.props['*']

    if (!regex.test(path)) {
      return <Redirect to="/admin/photos" />
    }

    return (
      <div>
        <Toolbar alignRight>
          <ButtonLink
            href="#"
            label="Add a photo"
            icon={<IconPlus />}
            onClick={ev => {
              ev.preventDefault()
              this.props.navigate('new')
            }}
          />
        </Toolbar>

        {photos.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <List>
              {photos.items.map((photo, index) => (
                <Photo
                  key={index}
                  {...photo}
                  onDelete={this.onDelete}
                  onEdit={this.onEdit}
                />
              ))}
            </List>

            <Pager
              {...photos.pager}
              // navigate={ (page) => this.props.loadPhotos({page})}
              navigate={page => this.props.navigate(`?page=${page}`)}
            >
              {({ items, getItemsProps }) => {
                return items.map(item => (
                  <li key={item.label} className="pager__item">
                    <ButtonLink
                      {...getItemsProps({
                        className: 'btn--gray',
                        label: item.label,
                        title: item.title,
                        item: item
                      })}
                    />
                  </li>
                ))
              }}
            </Pager>

            {this.props.children}
          </React.Fragment>
        )}
      </div>
    )
  }
}

Photos.propTypes = {
  '*': PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
  photos: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    pager: PropTypes.object
  }).isRequired,
  loadPhotos: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default Photos