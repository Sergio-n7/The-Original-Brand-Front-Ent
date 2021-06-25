import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Grid, Container, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";

import {
  editGarmet,
  fetchGarmetsDetails,
} from "../../redux/actions/garmetActions";
import { Garmet } from "../../redux/types/types";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    name: {
      margin: theme.spacing(1),
      color: theme.palette.primary.light,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    field: {
      marginBottom: theme.spacing(1),
    },
    categoryBox: {
      textAlign: "center",
    },
    categoryLabel: {
      color: "#8a8a8a",
    },
    select: {
      width: "80%",
      fontSize: "1rem",
      padding: "0.5rem 0.25rem",
      margin: ".2rem 1rem",
    },
    submit: {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.primary.light,
      margin: theme.spacing(3, 0, 2),
      "&:hover": {
        border: "0.2rem #404040 solid",
        backgroundColor: theme.palette.primary.light,
      },
    },
    link: {
      textDecoration: "none",
    },
    input: {
      margin: "1rem auto",
      width: "90%",
      textAlign: "center",
    },
    signUp: {
      textAlign: "center",
    },
    error: {
      color: "#fa1e0e",
      textAlign: "center",
    },
  })
);

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, "Name is too long.")
    .required("This field is required."),
  description: Yup.string().required("This field is required"),
  category: Yup.string()
    .max(20, "Category is too long")
    .required("This field is required."),
  stock: Yup.number()
    .min(0, "Stock can not be a negative value")
    .required("This fiedl is required."),
  price: Yup.number()
    .min(0, "Price cannot be negative.")
    .required("This field is required."),
  color: Yup.string(),
  size: Yup.string(),
});

type State = {
  garmet: {
    garmetDetail: Garmet | string;
    errorEditGarmet: Error | null;
  };
};

type InitialValue = {
  name: string;
  description: string;
  category: string;
  stock: number;
  price: number;
  color: string;
  size: string;
};

const GarmetEdit = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { garmetId } = useParams<{ garmetId: string }>();

  useEffect(() => {
    dispatch(fetchGarmetsDetails(garmetId));
  }, [dispatch, garmetId]);

  const { garmetDetail, errorEditGarmet } = useSelector(
    (state: State) => state.garmet
  );

  const initialValue: InitialValue = {
    name: (garmetDetail as Garmet).name,
    description: (garmetDetail as Garmet).description,
    category: (garmetDetail as Garmet).category,
    stock: (garmetDetail as Garmet).stock,
    price: (garmetDetail as Garmet).variant.price,
    color: (garmetDetail as Garmet).variant.color,
    size: (garmetDetail as Garmet).variant.size,
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography className={classes.name} variant="h4" noWrap>
          Edit the garmet
        </Typography>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const { name, description, category, stock, price, color, size } =
              values;
            dispatch(
              editGarmet(
                name,
                description,
                category,
                stock,
                price,
                color,
                size,
                garmetId
              )
            );
            window.location.assign("/");
          }}
        >
          {(formProps) => (
            <Form className={classes.form}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="name"
                  label="name"
                  type="text"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="description"
                  label="Description"
                  type="text"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="stock"
                  label="Available stock"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="price"
                  label="Price"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="color"
                  label="Color"
                  type="text"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="size"
                  label="Size"
                  type="text"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12} className={classes.categoryBox}>
                <p className={classes.categoryLabel}>Category</p>
                <Field
                  label="Category"
                  name="Category"
                  component="select"
                  className={classes.select}
                >
                  <option value="T-shirt-Polos">T-shirts & Polos</option>
                  <option value="Shirts">Shirts</option>
                  <option value="Shorts">Shorts</option>
                  <option value="Trousers">Trousers</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Lightweight jackets">
                    Lightweight jackets
                  </option>
                  <option value="Cardigans & knitted jumper">
                    Cardigans & knitted jumper
                  </option>
                  <option value="Sweatshirts & Hoodies">
                    Sweatshirts & Hoodies
                  </option>
                  <option value="Tracksuits & Joggers">
                    Tracksuits & Joggers
                  </option>
                  <option value="Sportswear">Sportswear</option>
                </Field>
              </Grid>
              {errorEditGarmet ? (
                <div className={classes.error}>{errorEditGarmet.message}</div>
              ) : (
                ""
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Edit Garmet information
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default GarmetEdit;
