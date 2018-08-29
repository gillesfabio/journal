import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { PrimaryButton } from '../../components/Buttons'

const PhotoWrapper = styled.li`
  padding: 2rem;
  display: flex;
  transition: background 100ms ease-out;

  &:hover {
    background: #ecf0f1;
  }

  & + & {
    border-top: 1px solid #ecf0f1;
  }
`

const PhotoPicture = styled.div`
  flex: 1;
  max-width: 15rem;
  margin: 0 1rem 0 0;

  img {
    max-width: 100%;
    max-height: 11rem;
    width: auto;
    margin: 0 auto;
    display: block;
    border: 0.5rem solid white;
  }
`

const PhotoInner = styled.div`
  flex: 1;
`

const PhotoTitle = styled.h2`
  font-size: 1.4rem;
  margin: 0 0 1rem;
`

const PhotoDescription = styled.p`
  color: #464646;
  font-size: 1.2rem;
`

const PhotoTools = styled.p`
  opacity: 0;
  transition: opacity 100ms ease-out;

  ${PhotoWrapper}:hover & {
    opacity: 1;
  }
`

const Photo = props => {
  return (
    <PhotoWrapper>
      <PhotoPicture>
        <img src={`/img/${props.name}`} />
      </PhotoPicture>
      <PhotoInner>
        <PhotoTitle>{props.title}</PhotoTitle>
        <PhotoDescription>{props.description}</PhotoDescription>
        <PhotoTools>
          <PrimaryButton onClick={props.onEdit.bind(this, props.id)}>
            {' '}
            Edit{' '}
          </PrimaryButton>
          <PrimaryButton onClick={props.onDelete.bind(this, props.id)}>
            Delete
          </PrimaryButton>
        </PhotoTools>
      </PhotoInner>
    </PhotoWrapper>
  )
}

Photo.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Photo
